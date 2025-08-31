export type Client = {
  id: string;
  name: string;
  email: string;
};

export const columns: {
  accessorKey: keyof Client;
  header: string;
  cell?: (info: any) => string;
}[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info: any) => `$${info.getValue()}`,
  },
];

export const data: Client[] = [
  { id: "1", name: "Joe Doe", email: "joe@gmail.com" },
  { id: "2", name: "John Doe", email: "john@gmail.com" },
];
