import { Table } from "@/components/ui/table";

const pendingSubmissions = [ // Hardcoded data - replace with API fetch
  { id: 1, user: "John Doe", type: "Plastic", weight: 3.2 },
  { id: 2, user: "Jane Smith", type: "Glass", weight: 1.5 },
];

export default function VerifyPage() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>User</Table.Head>
          <Table.Head>Material</Table.Head>
          <Table.Head>Weight</Table.Head>
          <Table.Head>Actions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {pendingSubmissions.map((submission) => (
          <Table.Row key={submission.id}>
            <Table.Cell>{submission.user}</Table.Cell>
            <Table.Cell>{submission.type}</Table.Cell>
            <Table.Cell>{submission.weight} kg</Table.Cell>
            <Table.Cell>
              <button className="mr-2">Approve</button>
              <button>Reject</button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}