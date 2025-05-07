import { useState, useEffect } from "react";
import { client } from "../../../../graphqlClient";
import { Pet } from "../types/Reservation.types";

export function useClientPets(clientId: string) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await client.request<{ clientPets: Pet[] }>(
          `query ClientPets($clientId: String!) {
            clientPets(client_id: $clientId) {
              id
              name
              species
              breed
              age
              sex
              weight
              color
              marks
              birth_date
              notes
            }
          }`,
          { clientId }
        );
        setPets(data.clientPets);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Error fetching pets");
        } else {
          setError("Error fetching pets");
        }
      } finally {
        setLoading(false);
      }
    };
    if (clientId) fetchPets();
  }, [clientId]);

  return { pets, loading, error };
}
