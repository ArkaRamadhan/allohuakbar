import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import App from "@/components/Layouts/App";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function BaseProject() {
  return (
    <App services="Base Project">
      <div className="flex flex-col gap-[1rem] p-[2rem]">
        <Label className="flex justify-center text-xl font-bold">
          Project Code Divisi IT Security
        </Label>
        <Label>Nomor urut /YYYYY/ZZZZZ/AAAAA/B/YEARS</Label>
        <div className="flex flex-col gap-2">
          <Label>Z</Label>
          <Table className="border-2 border-gray-200 ">
            <TableHeader>
              <TableRow>
                <TableHead>Infrastruktur Type</TableHead>
                <TableHead>Code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Software</TableCell>
                <TableCell>SOF</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hardware</TableCell>
                <TableCell>HAR</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jasa/Human Resource</TableCell>
                <TableCell>SER</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-2">
          <Label>A</Label>
          <Table className="border-2 border-gray-200 ">
            <TableHeader>
              <TableRow>
                <TableHead>Type Anggaran</TableHead>
                <TableHead>Code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>RBB</TableCell>
                <TableCell>RBB</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NON-RBB</TableCell>
                <TableCell>NRBB</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-2">
          <Label>B</Label>
          <Table className="border-2 border-gray-200 ">
            <TableHeader>
              <TableHead>NEW PRODUCT</TableHead>
              <TableHead>A</TableHead>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>RENEWAL</TableCell>
                <TableCell>B</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Y</Label>
          <Table className="border-2 border-gray-200 ">
            <TableHeader>
              <TableHead>GROUP</TableHead>
              <TableHead>Code</TableHead>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Security Operation</TableCell>
                <TableCell>ITS-ISO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Security Architecture & Governence</TableCell>
                <TableCell>ITS-SAG</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Badge className="w-fit p-2">
          <Label>EXAMPLE :</Label>
        </Badge>
        <Badge className="w-fit p-2">
          <Label>0001/ITS-SAG/SOF/RBB/A/2024</Label>
        </Badge>
      </div>
    </App>
  );
}
