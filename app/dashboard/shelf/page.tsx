import { ShelfManagement } from "@/components/shelf-management";
import { Contenedor, Estante, Tipo_Contenedor } from "@prisma/client";

interface ContenedorWithTipo extends Contenedor {
  Tipo_Contenedor: Tipo_Contenedor;
}

interface EstanteWithContainers extends Estante {
  Contenedor: ContenedorWithTipo[];
}

const ShelfPage = async () => {
  const shelfves: EstanteWithContainers[] = await fetch(
    `${process.env.APP_URL}/api/estantes`,
    {
      cache: "no-cache",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });

  const containerTypes: Tipo_Contenedor[] = await fetch(
    `${process.env.APP_URL}/api/contenedor/tipos`,
    {
      cache: "no-cache",
    }
  ).then((res) => res.json());

  return <ShelfManagement shelves={shelfves} containerTypes={containerTypes} />;
};

export default ShelfPage;
