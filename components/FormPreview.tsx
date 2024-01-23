import { useFormContext } from "react-hook-form";
import { Table, TableCell, TableRow } from "./ui/table";

const FormPreview = () => {
  const methods = useFormContext();

  const data = methods.watch();

  const dataArray = Object.entries(data);

  const mappedData = dataArray.map((item) => {
    return {
      name: item[0].slice(0, 1).toUpperCase() + item[0].slice(1),
      value: item[1],
    };
  });

  return (
    <Table>
      {mappedData.map((item) => {
        return (
          <TableRow>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
};

export default FormPreview;
