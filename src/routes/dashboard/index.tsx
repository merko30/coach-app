import { Link } from "@tanstack/react-router";
import {
  Calculator,
  Clipboard,
  History,
  List,
  ListCheck,
  Package,
  Package2,
  PackageCheck,
  ShoppingCart,
  Warehouse,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardHeader } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

const Section = ({
  title,
  items,
}: {
  title: string;
  items: Array<{ icon: React.ReactNode; label: string; link: string }>;
}) => (
  <div className="flex flex-col gap-4 bg-accent/40 pb-4 rounded-sm overflow-hidden">
    <h2 className="text-center text-2xl font-semibold uppercase bg-primary p-4 text-white">
      {title}
    </h2>
    <div className="flex flex-col md:flex-row gap-2">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="flex flex-col items-center justify-center flex-1 gap-4"
        >
          {item.icon}
          <h3 className="text-lg font-medium">{item.label}</h3>
        </Link>
      ))}
    </div>
  </div>
);

const UserInformation = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-48 h-48 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold mb-2">
        {/* Avatar initials */}
        MH
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Merim Hasanbegovic</h2>
        <div className="text-sm text-muted-foreground">
          {t("deliveryAddress")}
        </div>
        <div className="font-medium">
          {t("fullNameId", { name: "Merim Hasanbegovic", id: "KGCI1239" })}
        </div>
        <div>{t("streetAddress", { address: "67 Brookfield Dr." })}</div>
        <div>
          {t("cityStateCountryZip", {
            city: "MANCHESTER",
            state: "NEW HAMPSHIRE",
            country: "UNITED STATES",
            zip: "03109",
          })}
        </div>
        <div className="font-medium">{t("phone", { phone: "6036476970" })}</div>
      </div>
    </div>
  );
};
// ...existing code...

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <h1 className="text-3xl text-center uppercase font-semibold">
            {t("dashboard")}
          </h1>
        </CardHeader>
        <div className="flex p-6 flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 bg-background">
            <UserInformation />
          </div>
          <div className="w-full md:w-2/3 bg-background flex flex-col gap-12">
            <Section
              title={t("deliverySection")}
              items={[
                {
                  icon: <ShoppingCart size={48} />,
                  link: "/shipments",
                  label: t("myShipments"),
                },
                {
                  icon: <PackageCheck size={48} />,
                  link: "/shipments",
                  label: t("readyToSend"),
                },
                {
                  icon: <History size={48} />,
                  link: "/shipments",
                  label: t("shipmentHistory"),
                },
              ]}
            />
            <Section
              title={t("accountSummarySection")}
              items={[
                {
                  icon: <Package2 size={48} />,
                  link: "/orders",
                  label: t("ordersInProgress"),
                },
                {
                  icon: <Warehouse size={48} />,
                  link: "/orders",
                  label: t("itemsInStock"),
                },
                {
                  icon: <Clipboard size={48} />,
                  link: "/invoices",
                  label: t("invoices"),
                },
              ]}
            />
            <Section
              title={t("ordersSection")}
              items={[
                {
                  icon: <List size={48} />,
                  link: "/quotations",
                  label: t("quotations"),
                },
                {
                  icon: <Package size={48} />,
                  link: "/dashboard/orders/pick-up",
                  label: t("orderPickup"),
                },
                {
                  icon: <ListCheck size={48} />,
                  link: "/invoices",
                  label: t("deliveryOverview"),
                },
              ]}
            />
            <Section
              title={t("settingsSection")}
              items={[
                {
                  icon: <Calculator size={48} />,
                  link: "/dashboard/calculator",
                  label: t("calculator"),
                },
              ]}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
  // Add loader, meta, or action if needed
});
