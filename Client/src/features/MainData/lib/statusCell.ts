const statusCell = () => [
  {
    when: (row: any) => row.status === "Done",
    style: {
      backgroundColor: "rgba(63, 195, 128, 0.9)",
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row: any) => row.status === "Reschedule",
    style: {
      backgroundColor: "rgba(0, 182, 255, 0.9)",
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row: any) => row.status === "On Progress",
    style: {
      backgroundColor: "rgba(248, 148, 6, 0.9)",
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row: any) => row.status === "Cancel",
    style: {
      backgroundColor: "rgba(242, 38, 19, 0.9)",
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
];

export default statusCell;
