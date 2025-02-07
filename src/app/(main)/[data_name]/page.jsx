"use client";

import InputAndGraph from "@/components/InputAndGraph";
import { useParams, notFound } from "next/navigation";
import { getAllDataNames } from "@/constants/menu";

export default function Page() {
  const params = useParams();
  const dataName = params.data_name;
  const allowedDataNames = getAllDataNames();

  if (!allowedDataNames.includes(dataName)) {
    notFound();
  }

  return <InputAndGraph data_name={dataName} />;
}
