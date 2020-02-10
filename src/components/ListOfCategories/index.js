import React, {Fragment,useEffect,useState} from 'react'
import {Category} from '../Category'
import {List, Item} from './styles'

function useCategoriesData (){
    const [categories, setCategories] = useState([]) 
    const [loading, setLoading] = useState(false)

    useEffect(function(){
        setLoading(true)
        fetch('https://petgram-server-josias.josiascubillosg.now.sh/categories')
            .then(res => res.json())
            .then(res => {
                setCategories(res)
                setLoading(false)
            })
    }, [])

    return {categories, loading}

}

export const ListOfCategories = () => {
    const {categories, loading} = useCategoriesData()
    const [showFixed, setShowFixed] = useState(false)
    
    useEffect(function(){
        const onScroll = e => {
            const newShowFixed = window.scrollY > 200
            showFixed !== newShowFixed &&
            setShowFixed(newShowFixed)
        }

        document.addEventListener('scroll', onScroll)

        return () => document.removeEventListener('scroll', onScroll)
    }, [showFixed])

    const renderList = (fixed) => {
        return <List fixed={fixed}>
            {
                categories.map(category => <Item key={category.id}><Category {...category} /></Item>)
            }
        </List>
    }

    if(loading){
        return 'Cargando...'
    }

    return(
        <Fragment>
            {renderList()}
            {/* Solo se ejecuta ese renderList cuando showFixed sea true */}
            {showFixed && renderList(true)}
        </Fragment>
    )
}