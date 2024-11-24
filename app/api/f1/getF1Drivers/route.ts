import { IResponse } from "@/types/api_response_types";
import { F1DriversData, F1DriversResponse } from "@/types/f1.types";
import { NextResponse } from "next/server";

async function getF1Drivers(): Promise<F1DriversResponse<F1DriversData>> {
  const apiUrl = `${process.env.F1_DRIVERS_DATA_URL}?session_key=latest`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      console.error(
        "Error al obtener los pilotos desde la api:",
        res.statusText
      );
      return {
        error: "Error al obtener los pilotos",
      };
    }

    const d = await res.json();

    // update lawson y colapinto data
    const drivers = d.map((driver: F1DriversData) => {

      // update Lawson data
      if (driver.driver_number === 30) {
        driver.country_code = "NZL";
        driver.first_name = "Liam";
        driver.last_name = "Lawson";
        driver.full_name = "Liam LAWSON";
        driver.headshot_url =
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png";
        driver.team_colour = "6692FF";
        driver.team_name = "RB";
      }

      // update Colapinto data
      if (driver.driver_number === 43) {
        driver.country_code = "ARG";
        driver.first_name = "Franco";
        driver.last_name = "Colapinto";
        driver.full_name = "Franco COLAPINTO";
        driver.headshot_url =
          "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png";
        driver.team_colour = "64C4FF";
        driver.team_name = "Williams";
      }

      // update headshot url image quality
      if (driver.headshot_url.includes(".png.transform/1col/image.png")) {
        driver.headshot_url = driver.headshot_url.replace(
          ".png.transform/1col/image.png",
          ""
        );
      }

      return driver;
    });

    return {
      data: drivers,
    };
  } catch (error) {
    console.error("Error al obtener los pilotos:", error);
    return {
      error: "Error al obtener los pilotos",
    };
  }
}

export async function GET(): Promise<NextResponse<IResponse<F1DriversData>>> {
  try {
    const fetch_drivers = await getF1Drivers();

    if (fetch_drivers.error) {
      return NextResponse.json({
        error: fetch_drivers.error,
      });
    }

    const drivers = fetch_drivers.data;

    return NextResponse.json({
      data: drivers,
    });
  } catch (error) {
    console.error("Error al obtener los pilotos:", error);
    return NextResponse.json({
      error: "Error al obtener los pilotos",
    });
  }
}
