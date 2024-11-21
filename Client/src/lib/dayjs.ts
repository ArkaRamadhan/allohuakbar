import dayjs from "dayjs";
import "dayjs/locale/id"; // Locale Indonesia
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";

// Aktifkan plugin
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);

// Setel locale ke bahasa Indonesia
dayjs.locale("id");

// (Opsional) Update locale untuk nama hari atau format lainnya
dayjs.updateLocale("id", {
  weekdays: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  months: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
});

export default dayjs;
