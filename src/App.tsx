/*
* Author: Chengbin Feng 
*/
import React from 'react';
import './App.css';
import axios from "axios";


import {Layout, List, Table, Popover} from "antd";
const {Sider, Content} = Layout;

interface IData{
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo:{
            lat: string;
            lng: string;
        }
    }
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }


}


class App extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        axios.get("https://jsonplaceholder.typicode.com/users").then(resp=>this.setState({data: resp.data}));
    }

    state:{
        data:IData[]
    }={
        data:[]
    }

    render() {
        return (
            <div>
                <Layout>
                    <Sider/>
                    <Content style={{height:window.innerHeight-1}}>
                        <List
                            header={<div style={{color:"red"}}>Contacts:</div>}
                            bordered
                            dataSource={this.state.data}
                            renderItem={item => (
                                <List.Item>
                                    <Popover title={item.name} placement={"right"}
                                             content={
                                                 <div>
                                                     <p>UserName: {item.username}</p>
                                                     <p>Email: {item.email}</p>
                                                     <p>Address: {`${item.address.city}, ${item.address.suite}, ${item.address.city}  (${item.address.geo.lat}, ${item.address.geo.lng})`}</p>
                                                     <p>ZipCode: {item.address.zipcode}</p>
                                                     <p>Phone: {item.phone}</p>
                                                     <p>Website: {item.website}</p>
                                                     <p>
                                                         Company:
                                                         <Table columns={[
                                                             {title: 'Name', dataIndex: 'name'},
                                                             {title: 'CatchPhrase', dataIndex: 'catchPhrase'},
                                                             {title: 'BS', dataIndex: 'bs'}
                                                         ]} dataSource={[item.company]} size="small" pagination={{position:[]}}/>
                                                     </p>
                                                 </div>
                                             }>
                                        <span><div style={{color:"blue", textDecorationLine: 'underline'}}>{item.name}</div></span>
                                    </Popover>
                                </List.Item>
                            )}
                        />
                    </Content>
                    <Sider/>
                </Layout>
            </div>
        );
    }
}


export default App;
