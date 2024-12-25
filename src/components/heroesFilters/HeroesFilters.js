
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import {filterFetched, changeActiveFilter} from "../../actions";


const HeroesFilters = () => {
    const {request} = useHttp();
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    const activeFilter = useSelector(state => state.activeFilter);


    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => dispatch(filterFetched(data)))

        // eslint-disable-next-line
        }, []);
    
    const onClick = (name) => {
        console.log(name)
        dispatch(changeActiveFilter(name))

    }

    const btnList = filters.map(item => {
        
        const clazz = activeFilter === item.name ? `btn ${item.className}` : `btn ${item.className} active`;

        return <button className={clazz} key={item.name} onClick={() => onClick(item.name)}>{item.label}</button>;
    })

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {btnList}
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;