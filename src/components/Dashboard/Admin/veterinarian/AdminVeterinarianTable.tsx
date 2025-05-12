import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVeterinarians } from "@/hooks/useVeterinarians";
import { Calendar, Eye, Package, Phone } from "lucide-react";

const AdminVeterinarianTable: React.FC = () => {
  const { veterinarians, loading, error } = useVeterinarians();

  return (
    <Card className="max-w-5xl mx-auto mt-4">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-xl text-blue-800">
            Veterinarios registrados
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Total: {loading ? "..." : veterinarians.length} veterinarios
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500 bg-red-50 rounded-lg border border-red-200 p-4">
            <p className="font-semibold">Error al cargar datos</p>
            <p className="text-sm mt-2">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-24">ID</TableHead>
                  <TableHead>Veterinario</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead className="text-center">Reservas</TableHead>
                  <TableHead className="text-center">Órdenes</TableHead>
                  <TableHead className="w-24 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {veterinarians.map((vet) => (
                  <TableRow
                    key={vet.id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {vet.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{vet.user?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {vet.user?.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {vet.phone ? (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{vet.phone}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Sin teléfono
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-blue-50">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {vet.reservations?.length || 0}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-green-50">
                        <Package className="h-3.5 w-3.5 mr-1" />
                        {vet.careOrders?.length || 0}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {veterinarians.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No hay veterinarios registrados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminVeterinarianTable;
