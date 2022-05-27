import React from 'react'
import { Form, FormFeedback, Label, Input, Button, Row, Col, Card, Modal } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import "yup-phone";
import { addStudentDetail, selectStudent, updateStudentDetail } from '../slice/studentDetail'
import { useDispatch, useSelector } from 'react-redux'


function AddDetail() {

    const dispatch = useDispatch()
    const studentDetailList = useSelector(store => store.studentDetail.studentDetailList)
    const selectedStudentDetail = useSelector(store => store.studentDetail.selectedStudentDetail)

    const addStudentDetailSchema = yup.object().shape({
        usn: yup.string().max(10).required('USN is a required field'),
        firstName: yup.string().max(50).required('Firt name is a required field'),
        address: yup.string().required('Address is a required field'),
        mobileNumber: yup.number().required('Mobile number is a required field').test('len', 'Must be 10 characters', val => val && val.toString().length === 10),
        age: yup.number().required('Age is a required field').min(19).max(21),
    })

    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(addStudentDetailSchema) })

    const onSubmit = (data) => {
        const usnArr = studentDetailList.map(item => item.usn)
        if ((!selectedStudentDetail) && usnArr.includes(data.usn)) {
            return alert('The USN is already taken')
        } else {
            if (selectedStudentDetail) {
                dispatch(updateStudentDetail(data))
                dispatch(selectStudent(null))
            } else {
                dispatch(addStudentDetail(data))
            }
            setValue('usn', '')
            setValue('firstName', '')
            setValue('lastName', '')
            setValue('address', '')
            setValue('mobileNumber', '')
            setValue('age', '')
        }
    }
    if (selectedStudentDetail) {
        setValue('usn', selectedStudentDetail.usn)
        setValue('firstName', selectedStudentDetail.firstName)
        setValue('lastName', selectedStudentDetail.lastName)
        setValue('address', selectedStudentDetail.address)
        setValue('mobileNumber', selectedStudentDetail.mobileNumber)
        setValue('age', selectedStudentDetail.age)
    }

    const handleReset = () => {
        dispatch(selectStudent(null))
        setValue('usn', '')
        setValue('firstName', '')
        setValue('lastName', '')
        setValue('address', '')
        setValue('mobileNumber', '')
        setValue('age', '')

    }
    const ActionButton = () => {
        if (selectedStudentDetail) {
            return (
                <>
                    <Button className='inline' type='submit' size='sm' color="primary">Update</Button>
                    <Button className='ms-2 inline' size='sm' color="primary" onClick={handleReset}>Reset</Button>
                </>
            )
        } else {
            return (
                <>
                    <Button size='sm' type='submit' color="primary" className='inline'>Submit</Button>
                </>
            )
        }
    }
    return (
        <Card className='m-2 mx-4 p-2 d-flex'>
            <Row className='w-75 mx-auto text-primary text-center'>
                <h5 className=''>Student Details</h5>
            </Row>
            <Row className='w-75 mx-auto'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <Label className='mb-0'>USN</Label>
                            <Controller
                                id='usn'
                                name='usn'
                                control={control}
                                render={({ field }) => <Input {...field} disabled={selectedStudentDetail && selectedStudentDetail.hasOwnProperty("usn")} placeholder='001' bsSize='sm' invalid={errors.usn && true} />}
                            />
                            {errors.usn && <FormFeedback className='mt-0'>{errors.usn.message}</FormFeedback>}
                        </Col>
                        <Col>
                            <Label className='mb-0'>First Name</Label>
                            <Controller
                                id='firstName'
                                name='firstName'
                                control={control}
                                render={({ field }) => <Input {...field} onChange={(e) => setValue("firstName", e.target.value)} placeholder='Eg: Pongangai' bsSize='sm' invalid={errors.firstName && true} />}
                            />
                            {errors.firstName && <FormFeedback className='mt-0'>{errors.firstName.message}</FormFeedback>}
                        </Col>
                        <Col>
                            <Label className='mb-0'>Last Name</Label>
                            <Controller
                                id='lastName'
                                name='lastName'
                                control={control}
                                render={({ field }) => <Input {...field} onChange={(e) => setValue("lastName", e.target.value)} placeholder='Eg: Raman' bsSize='sm' />}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col>
                            <Label className='mb-0'>Address</Label>
                            <Controller
                                id='address'
                                name='address'
                                control={control}
                                render={({ field }) => <Input {...field} onChange={(e) => setValue("address", e.target.value)} placeholder='Eg: 12,KK Street, Salem - 636356' bsSize='sm' invalid={errors.address && true} />}
                            />
                            {errors.address && <FormFeedback className='mt-0'>{errors.address.message}</FormFeedback>}
                        </Col>
                        <Col>
                            <Label className='mb-0'>Mobile Number</Label>
                            <Controller
                                id='mobileNumber'
                                name='mobileNumber'
                                control={control}
                                render={({ field }) => <Input {...field} onChange={(e) => setValue("mobileNumber", e.target.value)} placeholder='Eg: 9876543210' bsSize='sm' invalid={errors.mobileNumber && true} />}
                            />
                            {errors.mobileNumber && <FormFeedback className='mt-0'>{errors.mobileNumber.message}</FormFeedback>}
                        </Col>
                        <Col>
                            <Label className='mb-0'>Age</Label>
                            <Controller
                                id='age'
                                name='age'
                                value
                                control={control}
                                render={({ field }) => <Input {...field} onChange={(e) => setValue("age", e.target.value)} placeholder='Eg: 25' bsSize='sm' invalid={errors.age && true} />}
                            />
                            {errors.age && <FormFeedback className='mt-0'>{errors.age.message}</FormFeedback>}
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col className='text-end'>
                            <ActionButton />
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Card>
    )
}

export default AddDetail