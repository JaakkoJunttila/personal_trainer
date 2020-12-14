import React, { useState, useEffect, useRef  } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import Button from '@material-ui/core/Button';

export default function TrainingsList() {
    const [trainings, setTrainings] = useState([]);

    const gridRef = useRef();

    useEffect(() => {
        getTrainings();
      }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
        console.log(trainings);
    }

    const deleteTraining = (id) => {
        const link = `https://customerrest.herokuapp.com/api/trainings/${id}`
        if (window.confirm('Are you sure?')) {
          fetch(link, {
            method: 'DELETE'
          })
          .then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}))
          //.then(_ => setMsg('Trining was deleted successfully'))
          //.then(_ => setOpen(true))
          .catch(err => console.error(err))
        }
    }
   
    const columns = [
        {

            headerName: '',
            field: 'id',
            width: 90,
            cellRendererFramework: params =>
              <Button color="secondary" size="small" onClick={() => deleteTraining(params.value)}>
                Delete
              </Button>
         
        },
        {
            headerName: 'Id',
            field: 'id',
            sortable: true,
            filter: true,
            cellStyle: {textAlign: 'left'},

        },
        {
            headerName: 'Date',
            field: 'date',
            sortable: true,
            filter: true,
            cellStyle: {textAlign: 'left'},
            cellRenderer: (params) => {
                return moment(params.value).format('MM/DD/YYYY HH:mm')
            }
        },
        {
            headerName: 'Duration',
            field: 'duration',
            sortable: true,
            filter: true,
            cellStyle: {textAlign: 'left'}
        },
        {
            headerName: 'Activity',
            field: 'activity',
            sortable: true,
            filter: true,
            cellStyle: {textAlign: 'left'}
        },
        {
            headerName: 'Customer',
            field: 'customer',
            sortable: true,
            filter: true,
            cellStyle: {textAlign: 'left'},
            cellRenderer: (params) => {
                //console.log((params.value.firstname == null) ? params : params.value.firstname)
                const firstname = params.value.firstname;
                const lastname = params.value.lastname;
                const fullName = firstname + ' ' + lastname
                return fullName

            }
        },
    ]

    return(
        <div className="ag-theme-material" style={{height:'700px'}}>
        <AgGridReact
            ref={gridRef}
            suppressCellSelection={true}
            onGridReady={ params => {
                gridRef.current = params.api
            }}
            columnDefs={columns}
            rowData={trainings}
            pagination="true"
            paginationPageSize="10"
        >
        </AgGridReact>
      </div>
    )
}