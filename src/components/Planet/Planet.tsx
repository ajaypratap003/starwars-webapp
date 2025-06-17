import React, {useEffect, useState} from "react";
import { Skeleton } from "..";

type PlanetProps = {
  apiUrl: string;
};

export const Planet: React.FC<PlanetProps> = ({ apiUrl }) => {
  const [planet, setPlanet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlanet = async () => {
      if (!apiUrl) return;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPlanet(data);
      } catch (error) {
        console.error("Error fetching planet data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanet();
  }, [apiUrl]);

  // Check if the apiUrl is provided
  if (!apiUrl) {
    return <p className="p-4">No API URL provided.</p>;
  }

  // If the data is still loading, show a skeleton loader
  return (
    <div>
      <p>
      <b>Planet: </b> 
      {isLoading ? <Skeleton width="100px" /> : planet?.name || "Unknown"}
      </p>
    </div>
  );
};
