import { Badge, Container, Table, Text } from "@mantine/core";

const PetDetails = () => {
  const pets = [
    {
      name: "Bella",
      breed: "Labrador",
      age: 3,
      gender: "Female",
      color: "Yellow",
      healthCondition: "Healthy",
      vaccination: "Up to Date",
      adoptionStatus: "Available",
      type: "Dog",
      image: "/dog.jpg",
    },
    {
      name: "Mittens",
      breed: "Siamese",
      age: 2,
      gender: "Male",
      color: "Gray",
      healthCondition: "Healthy",
      vaccination: "Not Vaccinated",
      adoptionStatus: "Adopted",
      type: "Cat",
      image: "/cat.jpg",
    },
  ];

  return (
    <Container>
      <Text size="xl" mb="md">
        Pets
      </Text>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>S.No</Table.Th>
            <Table.Th>Pet Name</Table.Th>
            <Table.Th>Breed</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Color</Table.Th>
            <Table.Th>HealthCondition</Table.Th>
            <Table.Th>Vaccination</Table.Th>
            <Table.Th>Adoption Status</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {pets.map((pet, idx) => (
            <Table.Tr key={idx}>
              <Table.Td>{idx + 1}</Table.Td>
              <Table.Td>{pet.name}</Table.Td>
              <Table.Td>{pet.breed}</Table.Td>
              <Table.Td>{pet.age} years</Table.Td>
              <Table.Td>{pet.gender}</Table.Td>
              <Table.Td>{pet.color}</Table.Td>
              <Table.Td>{pet.healthCondition}</Table.Td>
              <Table.Td>{pet.vaccination}</Table.Td>
              <Table.Td>
                <Badge
                  color={pet.adoptionStatus === "Adopted" ? "green" : "yellow"}
                >
                  {pet.adoptionStatus}
                </Badge>
              </Table.Td>
              <Table.Td>{pet.type}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default PetDetails;
