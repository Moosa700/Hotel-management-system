export default function InvoiceCard() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-8 text-2xl font-bold">
        Latest Invoice
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Invoice No.</span>
          <strong>#INV-10025</strong>
        </div>

        <div className="flex justify-between">
          <span>Room</span>
          <strong>Executive Suite</strong>
        </div>

        <div className="flex justify-between">
          <span>Nights</span>
          <strong>3</strong>
        </div>

        <div className="flex justify-between">
          <span>Total</span>
          <strong>$750</strong>
        </div>

        <div className="flex justify-between">
          <span>Status</span>
          <strong className="text-green-600">
            Paid
          </strong>
        </div>

      </div>

      <button className="mt-8 w-full rounded-xl bg-primary py-4 text-white">
        Download Invoice
      </button>

    </div>
  );
}