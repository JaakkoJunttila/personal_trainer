import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTratining';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const gridRef = useRef();

  useEffect(() => {
      getCustomers();
    }, [])

  const getCustomers = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
  }

  const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(newCustomer)
    })
    .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
    .catch(err => console.error(err))
  }

  const addTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(training)
    })
    .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
    .catch(err => console.error(err))
  }

  const deleteCustomer = (link) => {
    console.log(link)
    if (window.confirm('Are you sure?')) {
      fetch(link, {
        method: 'DELETE'
      })
      .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
      //.then(_ => setMsg('Car was deleted successfully'))
      //.then(_ => setOpen(true))
      .catch(err => console.error(err))
    }
  }

  const updateCustomer = (link, customer) => {
    fetch(link, {
        method: 'PUT',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(customer)
    })
    .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
    //.then(_ => setMsg('Customer was updated successfully'))
    //.then(_ => setOpen(true))
    .catch(err => console.error(err))
  }

  const columns = [
    {
      headerName: '',
      field: 'links[0].href',
      width: 80,
      cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params.data} />
        
    },
    {    
      headerName: '',
      field: 'links[0].href',
      width: 90,
      cellRendererFramework: params =>
        <Button color="secondary" size="small" onClick={() => deleteCustomer(params.data.links[0].href)}>
          Delete
        </Button>
    },
    {
      headerName: '',
      field: 'links[0].href',
      width: 140,
      cellRendererFramework: params => <AddTraining addTraining={addTraining} params={params.data} />
        
    },
    { headerName: 'First name', field: 'firstname', sortable: true, filter: true, cellStyle: {textAlign: 'left'}},
    { headerName: 'Last name', field: 'lastname', sortable: true, filter: true, cellStyle: {textAlign: 'left'}},
    { headerName: 'Email', field: 'email', sortable: true, filter: true, cellStyle: {textAlign: 'left'}},
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true, cellStyle: {textAlign: 'left'}},
    { headerName: 'Address', field: 'streetaddress', sortable: true, filter: true, cellStyle: {textAlign: 'left'}},
    { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, cellStyle: {textAlign: 'left'}},
    { headerName: 'City', field: 'city', sortable: true, filter: true, cellStyle: {textAlign: 'left'}},
  ]

  return(
    <div>
      <AddCustomer addCustomer={addCustomer} />
      <div className="ag-theme-material" style={{height:'700px'}}>
        <AgGridReact
            ref={gridRef}
            suppressCellSelection={true}
            onGridReady={ params => {
              gridRef.current = params.api
            }}
            columnDefs={columns}
            rowData={customers}
            pagination="true"
            paginationPageSize="10"
        >
        </AgGridReact>
      </div>
    </div>
  )
}
export default CustomerList;