export default function CustomerForm({ handleBackClick }) {
  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" placeholder="Your Name" required />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input id="address" type="text" placeholder="Your Address" required />
      </div>
      <div className="modal-actions">
        <button className="text-button" type="button" onClick={handleBackClick}>
          Back
        </button>
        <button className="button" type="button">
          Submit Order
        </button>
      </div>
    </form>
  );
}
