

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroAdd, filterFetched } from '../../actions';
import { useFormik } from 'formik';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';




const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const filters = useSelector(state => state.filters);


    useEffect(() => {
            request("http://localhost:3001/filters")
                .then(data => dispatch(filterFetched(data)))
    
            // eslint-disable-next-line
        }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            element: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
            description: Yup.string()
            .min(5, 'Must be 5 characters or more')
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
            element: Yup.string().required('Required')
        }),
        onSubmit: values => {
            const id = uuid();
        //   alert(JSON.stringify(values, null, 2));
            request(`http://localhost:3001/heroes`, "POST", JSON.stringify({...values, id: id}))
                    .then(dispatch(heroAdd({...values, id: id}))).finally(formik.resetForm());
        },
      });

      const filtersList = (filters) => {
        return filters.filter(item => item.name !== "all").map(item => <option value={item.name} key={item.name}>{item.label}</option>);
      }

      const list = filtersList(filters);
    return (
        <form className="border p-4 shadow-lg rounded" 
        onSubmit={formik.handleSubmit}
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (<div style={{"color": 'red'}}>{formik.errors.name}</div>) : null}
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="description" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (<div style={{"color": 'red'}}>{formik.errors.description}</div>) : null}
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.element}
                    >

                    <option value=''>Я владею элементом...</option>
                    {list}
                </select>
                    {formik.touched.element && formik.errors.element ? (<div style={{"color": 'red'}}>{formik.errors.element}</div>) : null}
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;