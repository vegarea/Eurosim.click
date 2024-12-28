import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { ValidationResult } from '../types/ValidationTypes';

interface TypeValidationProps {
  tableName: string;
  validations: ValidationResult[];
}

export function TypeValidation({ tableName, validations }: TypeValidationProps) {
  const allValid = validations.every(v => v.isValid);
  const hasWarnings = validations.some(v => !v.isValid);

  const getIcon = () => {
    if (allValid) return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (hasWarnings) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatus = () => {
    if (allValid) return 'default';
    if (hasWarnings) return 'secondary';
    return 'destructive';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {getIcon()}
          Validación de Tipos: {tableName}
          <Badge 
            variant={getStatus()}
            className="ml-auto"
          >
            {allValid ? 'Válido' : hasWarnings ? 'Advertencias' : 'Error'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {validations.map((validation, index) => (
          <Alert 
            key={index}
            variant={validation.isValid ? 'default' : 'destructive'}
            className="mb-2"
          >
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span>{validation.field}</span>
                <Badge variant={validation.isValid ? 'default' : 'secondary'}>
                  {validation.dbType} → {validation.tsType}
                </Badge>
              </div>
              {!validation.isValid && (
                <p className="text-sm text-muted-foreground mt-1">
                  {validation.message}
                </p>
              )}
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}