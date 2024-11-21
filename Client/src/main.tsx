import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//? import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Menit } from "@/lib/time";
import { TokenProvider } from "./hooks/useToken";
import { ErrorBoundary } from "./pages/Error/ErrorBoundary";
// AUTH
import { Login } from "@/features/Auth/pages/Login";
// USER
import User from "@/features/MainData/pages/User";
// WELCOME
import Welcome from "@/pages/Welcome";
import NotFound from "@/pages/Error/404";
// DASHBOARD
import Dashboard from "@/pages/Dashboard";
// DOKUMEN
import Memo from "@/features/MainData/pages/Dokumen/Memo";
import BeritaAcara from "@/features/MainData/pages/Dokumen/BeritaAcaraPage";
import Sk from "@/features/MainData/pages/Dokumen/SkPage";
import Surat from "@/features/MainData/pages/Dokumen/SuratPage";
import Perdin from "@/features/MainData/pages/Dokumen/PerjalananDinasPage";
// RENCANA KERJA
import Project from "@/features/MainData/pages/RencanaKerja/ProjectPage";
import BaseProject from "@/features/MainData/pages/RencanaKerja/BaseProjectPage";
// KEGIATAN PROSES
import TimelineDesktop from "@/features/MainData/pages/KegiatanProses/TimelineDesktop";
import Meeting from "@/features/MainData/pages/KegiatanProses/MeetingPage";
import BookingRapat from "@/features/MainData/pages/KegiatanProses/BookingRapatPage";
import JadwalRapat from "@/features/MainData/pages/KegiatanProses/JadwalRapatPage";
import JadwalCuti from "@/features/MainData/pages/KegiatanProses/JadwalCutiPage";
// WEEKLY MEETING
import TimelineProject from "@/features/MainData/pages/KegiatanProses/TimelineProject";
import MeetingShcedule from "@/features/MainData/pages/KegiatanProses/MeetingListPage";
// DATA INFORMASI
import SuratMasuk from "@/features/MainData/pages/DataInformasi/SuratMasukPage";
import SuratKeluar from "@/features/MainData/pages/DataInformasi/SuratKeluarPage";
import Arsip from "@/features/MainData/pages/DataInformasi/ArsipPage";
// REQUEST
import Request from "@/features/MainData/pages/Request/requestPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      select: (data: any) => data?.data,
      refetchIntervalInBackground: true,
      staleTime: Menit(10),
    },
  },
});

const WELCOME = [
  {
    path: "/",
    element: <Welcome />,
    errorElement: <NotFound />,
  },
];

const AUTH = [
  {
    path: "/login",
    element: <Login />,
  },
];

const DASHBOARD = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

const DOCUMENT = [
  {
    path: "/memo",
    element: <Memo />,
  },
  {
    path: "/berita-acara",
    element: <BeritaAcara />,
  },
  {
    path: "/sk",
    element: <Sk />,
  },
  {
    path: "/surat",
    element: <Surat />,
  },
  {
    path: "/perjalanan-dinas",
    element: <Perdin />,
  },
];

const PROJECT = [
  {
    path: "/project",
    element: <Project />,
  },
  {
    path: "/base-project",
    element: <BaseProject />,
  },
];

const KEGIATAN = [
  {
    path: "/timeline-desktop",
    element: <TimelineDesktop />,
  },
  {
    path: "/booking-rapat",
    element: <BookingRapat />,
  },
  {
    path: "/jadwal-rapat",
    element: <JadwalRapat />,
  },
  {
    path: "/jadwal-cuti",
    element: <JadwalCuti />,
  },
  {
    path: "/meeting",
    element: <Meeting />,
  },
];

const WEEKLYMEETING = [
  {
    path: "/timeline-project",
    element: <TimelineProject />,
  },
  {
    path: "/meeting-schedule",
    element: <MeetingShcedule />,
  },
];

const INFORMASI = [
  {
    path: "/surat-masuk",
    element: <SuratMasuk />,
  },
  {
    path: "/surat-keluar",
    element: <SuratKeluar />,
  },
  {
    path: "/arsip",
    element: <Arsip />,
  },
];

const USER = [
  {
    path: "/user",
    element: <User />,
  },
];

const REQUEST = [
  {
    path: "/request",
    element: <Request />,
  },
];

const ROUTER = createBrowserRouter([
  ...WELCOME,
  ...AUTH,
  ...DASHBOARD,
  ...DOCUMENT,
  ...PROJECT,
  ...KEGIATAN,
  ...WEEKLYMEETING,
  ...INFORMASI,
  ...USER,
  ...REQUEST,
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TokenProvider>
      <ErrorBoundary>
        <RouterProvider router={ROUTER} />
      </ErrorBoundary>
    </TokenProvider>
    {/* //?  <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>
);
