import AddEventForm from "@/components/AddEventForm";

export default async function page() {
  return (
    <main className="container mx-auto px-4 py-5 flex flex-col  border-white/30 mb-9">
      <AddEventForm />
    </main>
  );
}
