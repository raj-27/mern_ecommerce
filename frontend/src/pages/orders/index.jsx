import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LaunchIcon from '@material-ui/icons/Launch';
import './index.scss';
import { Chip } from '@material-ui/core';
const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
    {
        field: 'status',
        headerName: 'Status',
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
            return params.getValue(params.id, 'status') === 'Delivered'
                ? 'greenColor'
                : 'redColor';
        },
    },
    {
        field: 'itemsQty',
        headerName: 'Items Qty',
        type: 'number',
        minWidth: 150,
        flex: 0.3,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        minWidth: 270,
        flex: 0.5,
    },

    {
        field: 'actions',
        flex: 0.3,
        headerName: 'Actions',
        minWidth: 150,
        type: 'number',
        sortable: false,
        renderCell: (params) => {
            return (
                <Link to={`/order/${params.getValue(params.id, 'id')}`}>
                    <LaunchIcon />
                </Link>
            );
        },
    },
];
export default function DataTable() {
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    console.log(orders);
    const rows = [];
    orders?.forEach((item) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        });
    });
    return (
        <div
            style={{
                height: 'fit-content',
                width: '100%',
                margin: '5rem 0',
                padding: '0 2rem',
            }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
}
