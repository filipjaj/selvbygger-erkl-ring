import { useFormContext } from "react-hook-form";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

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
      <TableBody>
        {mappedData.map((item) => {
          return (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default FormPreview;
