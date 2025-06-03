import "./UsersDatabase.css";
/*
Components
- UsersDatabase
  - DataTable
  - NameInputs

State
- {id: name}
- searchbar value
- selectedId
- firstNameVal
- lastNameVal

Plan
1. render with dummy data
2. add filtering
4. handle creating
5. handle updating
6. handle deleting
*/

const UsersDatabase = () => {
  return (
    <div className="users-database">
      <input className="users-database--search" />
      <div className="users-database__data-table">
        <ul>
          <li>example</li>
        </ul>
      </div>
      <div className="users-database__name-inputs">
        <label htmlFor="users-database__first-name">First Name</label>
        <input id="users-database__first-name" />
        <label htmlFor="users-database__last-name">Last Name</label>
        <input id="users-database__last-name" />
      </div>
      <div className="users-database__buttons">
        <button>Create</button>
        <button>Update</button>
        <button>Delete</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default UsersDatabase;
