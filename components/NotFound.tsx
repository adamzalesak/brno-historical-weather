import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NotFound = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page not found</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={"/"}>
          <Button variant="outline">Go home </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
