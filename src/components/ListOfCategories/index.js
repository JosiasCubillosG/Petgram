import React, {Fragment,useEffect,useState} from 'react'
import {Category} from '../Category'
import {List, Item} from './styles'

export const ListOfCategories = () => {
    const [categories, setCategories] = useState([]) 
    const [showFixed, setShowFixed] = useState(false)
    useEffect(function(){
        fetch('https://petgram-server-josias.josiascubillosg.now.sh/categories')
            .then(res => res.json())
            .then(res => {
                setCategories(res)
            })
    }, [])

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

    return(
        <Fragment>
            {renderList()}
            {/* Solo se ejecuta ese renderList cuando showFixed sea true */}
            {showFixed && renderList(true)}
        </Fragment>
    )
}