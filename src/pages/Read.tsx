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

import { useQuery } from "../hooks/useQuery";
import { useUser } from "../contexts/UserContext";
import Page from "../components/layout/Page";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs`;

interface ReadProps {}

const Read: FunctionComponent<ReadProps> = () => {
  const { id } = useParams();
  const { fetcher, request } = useUser();

  const { data, isLoading, error } = useSWR(`/run/${id}`, fetcher);

  const query = useQuery();

  const queryPage = query.get("page");

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);

  const [readingTime, setReadingTime] = useState(0);

  const goToPreviousPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
  };

  const zoomIn = () => {
    setScale(scale + 0.1);
  };
  const zoomOut = () => {
    setScale(scale - 0.1);
  };

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
    setReadingTime(0);

    const timer = setInterval(() => {
      setReadingTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [pageNumber]);

  if (isLoading) return <Loading />;

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
      setPageNumber(pageNumber + 1);
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        return <Navigate to={"/"} replace />;
      }
    }
  };

  return (
    <>
      <Page exitDirection="down">
        <div className="flex items-center justify-between">
          <BackButton path="/" />
          <div className="flex items-center gap-1   lg:gap-2">
            <Button size="xl" ariaLabel="abrir painel de páginas" outlined>
              <span className="w-6 h-6 flex justify-center items-center">
                {pageNumber}
              </span>
            </Button>
            <Button
              size="xl"
              ariaLabel="página anterior"
              onClick={goToPreviousPage}
              disabled={pageNumber == 1}
            >
              <SkipPreviousRounded />
            </Button>
            <Button
              size="xl"
              ariaLabel="próxima página"
              onClick={goToNextPage}
              disabled={pageNumber == totalPages}
            >
              <SkipNextRounded />
            </Button>
            <Button
              size="xl"
              ariaLabel="diminuir escala da página"
              disabled={scale <= 1}
              onClick={zoomOut}
            >
              <ZoomOutRounded />
            </Button>
            <Button
              size="xl"
              ariaLabel="aumentar escala da página"
              disabled={scale >= 2}
              onClick={zoomIn}
            >
              <ZoomInRounded />
            </Button>
          </div>
        </div>

        <div className="flex flex-grow items-start justify-center overflow-scroll">
          <Document
            file={`/examplebook.pdf`}
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
      </Page>
    </>
  );
};

export default Read;
