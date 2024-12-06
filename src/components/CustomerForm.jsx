export default function CustomerForm({ handleBackClick }) {
  return (
    <form>
      <div style={{ marginBottom: "20px" }}>
        <label>Total amount:</label>
      </div>
      <div className="control">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="Your Name"
          required
          style={{ marginBottom: "5px" }}
        />

        <label htmlFor="address">E-Mail Address</label>
        <input
          id="email"
          type="text"
          placeholder="Your Email"
          required
          style={{ marginBottom: "5px" }}
        />

        <label htmlFor="address">Street</label>
        <input
          id="street"
          type="text"
          placeholder="Your Street"
          required
          style={{ marginBottom: "5px" }}
        />

        <div className="control-row" style={{ marginBottom: "5px" }}>
          <div>
            <label htmlFor="address">Poste Code</label>
            <input
              id="code"
              type="text"
              placeholder="Your Poste Code"
              required
            />
          </div>
          <div>
            <label htmlFor="address">City</label>
            <input id="city" type="text" placeholder="Your City" required />
          </div>
        </div>
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
