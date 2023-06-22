const ContactPage = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero-content flex flex-col">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Contact us!</h1>
        </div>
        <div className="flex-shrink-0 w-full md:w-1/2 shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <textarea
                className="textarea textarea-warning"
                placeholder="Bio"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Contact</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
