import React, { useEffect, useState } from 'react'
// import data from './MOCK_DATA.json'
import DataTable from 'react-data-table-component'
import { Button, Card, Modal, Label, Col, Row, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { deleteStudentDetail, fetchStudentDetails, selectStudent } from '../slice/studentDetail'

function Table() {

    const [openModal, setOpenModal] = useState(false)
    const [deleteStudentUsn, setDeleteStudentUsn] = useState(null)

    const toggleModal = () => {
        setOpenModal(!openModal)
    }
    const data = useSelector(store => store.studentDetail.studentDetailList)
    console.log(data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStudentDetails())
    }, [])

    const handleEdit = (data) => {
        console.log(data)
        dispatch(selectStudent(data))
    }

    const handleDeleteStudent = (data) => {
        setDeleteStudentUsn(data.usn)
        toggleModal()
    }
    const handleDelete = () => {
        console.log('delete action is clicked')
        dispatch(deleteStudentDetail(deleteStudentUsn))
        toggleModal()
    }

    const columns = [
        {
            name: 'USN',
            minWidth: '100px',
            selector: row => row.usn,
        },
        {
            name: "First Name",
            minWidth: '150px',
            selector: row => row.firstName
        },
        {
            name: "Last Name",
            minWidth: '150px',
            selector: row => row.lastName
        },
        {
            name: 'Address',
            minWidth: '300px',
            selector: row => row.address
        },
        {
            name: 'Mobile Number',
            minWidth: '150px',
            selector: row => row.mobileNumber,
        },
        {
            name: 'Age',
            minWidth: '100px',
            selector: row => row.age
        },
        {
            name: 'Edit',
            minWidth: '100px',
            cell: row => (
                <div className='d-flex justify-content-center'>
                    <Button onClick={() => handleEdit(row)}>Edit</Button>
                </div>
            )
        },
        {
            name: 'Delete',
            minWidth: '100px',
            cell: row => (
                <div className='d-flex justify-content-center'>
                    <Button onClick={() => handleDeleteStudent(row)}>Delete</Button>
                </div>
            )
        }
    ]

    return (
        <Card className='mx-4'>
            <DataTable
                noHeader={true}
                data={data}
                columns={columns}
                pagination
                className='react-dataTable'
                highlightOnHover={true}
            />
            <Modal
                isOpen={openModal}
                toggle={toggleModal}
            >
                <ModalHeader toggle={toggleModal}>Delete Action</ModalHeader>
                <ModalBody>
                    Are you sure want to delete?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDelete}>Delete</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Card>
    )
}

export default Table