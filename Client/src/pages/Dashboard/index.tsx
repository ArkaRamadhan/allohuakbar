import App from "@/components/Layouts/App";
import { KegiatanChart } from "@/components/Fragments/Dashboard/KegiatanChart";
import { RencanaKerjaChart } from "@/components/Fragments/Dashboard/RencanaKerjaChart";
import { WeeklyChart } from "@/components/Fragments/Dashboard/WeeklyChart";
import { DataInformasiChart } from "@/components/Fragments/Dashboard/DataInformasiChart";
import { DokumenChart } from "@/components/Fragments/Dashboard/DokumenChart";

const Dashboard = () => (
  <App services="Dashboard">
    <div className="h-full p-[1rem] grid grid-cols-6 grid-rows-3 gap-4">
      {/* Kegiatan */}
      <div className="col-span-4">
        <KegiatanChart />
      </div>

      {/* Rencana Kerja */}
      <div className="col-span-2 col-start-5">
        <RencanaKerjaChart />
      </div>

      {/* Weekly Timeline */}
      <div className="col-span-3 row-start-2">
        <WeeklyChart />
      </div>

      {/* Data & Informasi */}
      <div className="col-span-3 col-start-4">
        <DataInformasiChart />
      </div>

      {/* Dokumen */}
      <div className="col-span-6 row-start-3">
        <DokumenChart />
      </div>
    </div>
  </App>
);

export default Dashboard;
