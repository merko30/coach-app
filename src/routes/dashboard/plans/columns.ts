export type Plan = {
  id: string;
  name: string;
  price: number;
};

export const columns: {
  accessorKey: keyof Plan;
  header: string;
  cell?: (info: any) => string;
}[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info: any) => `$${info.getValue()}`,
  },
];

export const data: Plan[] = [
  { id: "1", name: "Basic", price: 10 },
  { id: "2", name: "Pro", price: 25 },
];
