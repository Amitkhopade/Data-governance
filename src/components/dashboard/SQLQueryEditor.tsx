import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Play, Magic } from "lucide-react";

interface ConnectionConfig {
  id: string;
  name: string;
  type: 'postgres' | 'mysql' | 'sqlserver' | 'snowflake' | 'oracle';
}

const mockConnections: ConnectionConfig[] = [
  { id: '1', name: 'Production DB', type: 'postgres' },
  { id: '2', name: 'Warehouse', type: 'snowflake' },
  { id: '3', name: 'Analytics DB', type: 'mysql' }
];

export function SQLQueryEditor() {
  const [selectedConnection, setSelectedConnection] = useState<string>('');
  const [query, setQuery] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleAIAssist = async () => {
    try {
      const response = await fetch('http://localhost:8000/agent/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `Generate SQL query for: ${query}`,
          agentType: 'sql'
        }),
      });

      const data = await response.json();
      setQuery(data.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const executeQuery = async () => {
    setIsExecuting(true);
    try {
      // TODO: Implement actual query execution
      // This is just a mock response
      setResults([
        { id: 1, name: 'Sample Data 1' },
        { id: 2, name: 'Sample Data 2' }
      ]);
    } catch (error) {
      console.error('Error executing query:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          SQL Query Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="mb-4">
          <Select value={selectedConnection} onValueChange={setSelectedConnection}>
            <SelectTrigger>
              <SelectValue placeholder="Select Database Connection" />
            </SelectTrigger>
            <SelectContent>
              {mockConnections.map(conn => (
                <SelectItem key={conn.id} value={conn.id}>
                  {conn.name} ({conn.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between mb-2">
            <Button variant="outline" onClick={handleAIAssist} className="gap-2">
              <Magic className="h-4 w-4" />
              AI Assist
            </Button>
            <Button onClick={executeQuery} disabled={!selectedConnection || isExecuting} className="gap-2">
              <Play className="h-4 w-4" />
              Execute
            </Button>
          </div>
          
          <Textarea
            className="flex-1 font-mono"
            placeholder="Enter your SQL query or describe what you want to query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {results && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Results:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[200px]">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
