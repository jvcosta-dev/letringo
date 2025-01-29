import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import {
  SkipNextRounded,
  SkipPreviousRounded,
  ZoomInRounded,
  ZoomOutRounded,
} from "@mui/icons-material";
import { Navigate, useParams } from "react-router-dom";
import { Document, Page as PagePDF, pdfjs } from "react-pdf";
import useSWR, { mutate } from "swr";
import { isAxiosError } from "axios";
import { openDB } from "idb";

import { useQuery } from "../hooks/useQuery";
import { useUser } from "../contexts/UserContext";
import Page from "../components/layout/Page";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";
import GenericModal from "../components/ui/GenericModal";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs`;

const Read: FunctionComponent = () => {
  const { id } = useParams();
  const { fetcher, request } = useUser();
  const query = useQuery();
  const queryPage = query.get("page");

  const { data, isLoading, error } = useSWR(id ? `/run/${id}` : null, fetcher);

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [readingTime, setReadingTime] = useState(0);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data?.run?.id && !pdfBlobUrl) {
      (async () => {
        const db = await openDB("PDFStore", 1, {
          upgrade(db) {
            db.createObjectStore("pdfs");
          },
        });
        const pdfBlob = await db.get("pdfs", data.run.id);
        if (pdfBlob) {
          const url = URL.createObjectURL(pdfBlob);
          setPdfBlobUrl(url);
        }
      })();
    }
  }, [data]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const db = await openDB("PDFStore", 1, {
      upgrade(db) {
        db.createObjectStore("pdfs");
      },
    });

    await db.put("pdfs", file, data?.run?.id);
    const url = URL.createObjectURL(file);
    setPdfBlobUrl(url);
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
  };

  const zoomIn = () => setScale(scale + 0.1);
  const zoomOut = () => setScale(scale - 0.1);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
    if (queryPage) {
      const parsedQueryPage = parseInt(queryPage);

      if (
        parsedQueryPage &&
        parsedQueryPage >= 1 &&
        parsedQueryPage <= numPages
      ) {
        setPageNumber(parsedQueryPage);
      }
    }
  };

  useEffect(() => {
    if (pdfBlobUrl) {
      setReadingTime(0);
      const timer = setInterval(() => {
        setReadingTime((prev) => prev + 1);
        console.log("set time");
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [pageNumber]);

  if (isLoading)
    return (
      <Page>
        <Loading />
      </Page>
    );

  if (error) return <Navigate to={"/404"} replace />;

  const isRunIncrementDisabled =
    data &&
    data.run.page_list &&
    data.run.page_list
      .split(",")
      .map((n: any) => n.trim())
      .includes(pageNumber.toString());

  const handleIncrementRun = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log("increment init");
      await request(
        {
          url: `/run/${id}`,
          data: {
            read_time: readingTime,
            page: pageNumber,
          },
          method: "PATCH",
        },
        true
      );
      mutate(`/run/${id}`);
      console.log("increment pageNumber");
      setPageNumber(pageNumber + 1);
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        return <Navigate to={"/"} replace />;
      }
    }
  };

  return (
    <Page>
      {pdfBlobUrl ? (
        <>
          <div className="flex items-center justify-between">
            <BackButton path="/" />
            <div className="flex items-center gap-1 lg:gap-2">
              <Button size="xl" ariaLabel="abrir painel de páginas" outlined>
                <span className="w-6 h-6 flex justify-center items-center">
                  {pageNumber}
                </span>
              </Button>
              <Button
                size="xl"
                ariaLabel="página anterior"
                onClick={goToPreviousPage}
                disabled={pageNumber === 1}
              >
                <SkipPreviousRounded />
              </Button>
              <Button
                size="xl"
                ariaLabel="próxima página"
                onClick={goToNextPage}
                disabled={pageNumber === totalPages}
              >
                <SkipNextRounded />
              </Button>
              <Button
                size="xl"
                ariaLabel="diminuir escala da página"
                disabled={scale <= 0.4}
                onClick={zoomOut}
              >
                <ZoomOutRounded />
              </Button>
              <Button
                size="xl"
                ariaLabel="aumentar escala da página"
                disabled={scale >= 3}
                onClick={zoomIn}
              >
                <ZoomInRounded />
              </Button>
            </div>
          </div>
          <div className="flex flex-grow items-start justify-center overflow-scroll">
            <Document
              file={pdfBlobUrl}
              onLoadSuccess={onLoadSuccess}
              loading="Carregando PDF..."
            >
              <PagePDF
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="h-full"
                loading="Carregando página..."
                scale={scale}
              />
            </Document>
          </div>
          <form onSubmit={handleIncrementRun}>
            <Button
              size="xl"
              ariaLabel="Marcar página como lida"
              fill
              disabled={isRunIncrementDisabled}
              submit
            >
              {isRunIncrementDisabled
                ? `Página ${pageNumber} já lida`
                : `Marcar ${pageNumber} Como Lida`}
            </Button>
          </form>
        </>
      ) : (
        <GenericModal label="Arquivo Necessário">
          <div className="flex flex-col gap-5">
            <blockquote className="text-xl">
              É necessário fornecer um arquivo .pdf para realizar a leitura
              (você pode apagar o arquivo após adicioná-lo aqui).
            </blockquote>
            <label
              htmlFor="file"
              className="w-full flex flex-col items-center gap-2 cursor-pointer text-center text-xl font-bold underline text-primary"
            >
              Inserir PDF
            </label>

            <a
              href={data?.book?.src_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button ariaLabel="baixar" size="xl" fill>
                Baixar PDF Sugerido
              </Button>
            </a>
          </div>
          <input
            id="file"
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </GenericModal>
      )}
    </Page>
  );
};

export default Read;
