import dayjs from "@/lib/dayjs";

const FilterTableCell = (field: any, value: any) => {
  switch (field.type) {
    case "number":
      return `Rp. ${new Intl.NumberFormat("id-ID").format(value)}`;
    case "date":
      if (field.name === "bulan") {
        return value ? dayjs(value).format("dddd, DD MMM YYYY") : "";
      }
      return value ? dayjs(value).format("dddd, DD MMM YYYY") : "";
    default:
      return value;
  }
};

export default FilterTableCell;
