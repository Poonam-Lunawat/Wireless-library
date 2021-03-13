import React from 'react';
import { Text, ScrollView, FlatList, SafeAreaView, View, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';
import db from '../config'
export default class SearchScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            allTransactions: [],
            latVisibleTransaction : null
        }
    }

    fetchMoreTransaction = async () =>{
        var text = this.state.search.toUpperCase()
        var enteredText = text.split("")
        if(enteredText[0].toUpperCase()==='B'){
            const transaction = await db.collection("transaction").where('bookId',"==",text).startAfter(this.state.latVisibleTransaction).limit(10).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions : [...this.state.allTransactions, doc.data()],
                    latVisibleTransaction: doc
                })
            })
        }
        else if(enteredText[0].toUpperCase()==='S') {
            const transaction = await db.collection("transaction").where('studentId',"==",text).startAfter(this.state.latVisibleTransaction).limit(10).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions : [...this.state.allTransactions, doc.data()],
                    latVisibleTransaction: doc
                })
            })
        }

        // const query = await db.collection("transaction").startAfter(this.state.latVisibleTransaction).limit(10).get()
        // query.docs.map((doc)=>{
        //     this.setState({
        //         latVisibleTransaction: [... this.state.allTransactions,doc.data()],
        //         latVisibleTransaction: doc
        //     })
        // })
    }

    searchTransactions = async (text) => {
        var enteredText = text.split("");
        if(enteredText[0].toUpperCase()==='B'){
            const transaction = await db.collection("transaction").where('bookId',"==",text).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions : [...this.state.allTransactions, doc.data()],
                    latVisibleTransaction: doc
                })
            })
        }
        else if(enteredText[0].toUpperCase()==='S') {
            const transaction = await db.collection("transaction").where('studentId',"==",text).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions : [...this.state.allTransactions, doc.data()],
                    latVisibleTransaction: doc
                })
            })
        }
    }
    componentDidMount = async () => {
        const query = await db.collection("transaction").limit(10).get()
        query.docs.map((doc) => {
            this.setState({
                // allTransactions: [...this.state.allTransactions, doc.data()]
                allTransactions:[],
                latVisibleTransaction : doc
            })
        })
    }
    render() {

        return (
            
            // <ScrollView>
            // {
            //     this.state.allTransactions.map((transaction,index)=>{
            //         return(
            //             <View key = {index} style = {{borderBottomWidth :2}}>
            //             <Text>{"Book Id:" + transaction.bookId}</Text>
            //             <Text>{"student Id:" + transaction.studentId}</Text>
            //             <Text>{"Transaction Type:" + transaction.transactionType}</Text>
            //             <Text>{"Book Id:" + transaction.bookId}</Text>

            //             </View>
            //         )

            //     })
            // }
            // </ScrollView>
            <View style= {styles.container}>
                <View style={styles.searchBar}>
                    <TextInput style={styles.bar}
                        placeholder = " Enter book Id or student Id"
                        onChangeText ={(text)=> {
                            this.setState({search : text})
                        }}/>
                        <TouchableOpacity 
                        style= {styles.searchButton}
                        onPress = {()=> {this.searchTransactions(this.state.search)}}>
                            <Text> Search </Text>
                        </TouchableOpacity>
                </View>

            <FlatList
                data={this.state.allTransactions}
                renderItem={({ item }) => (
                    <View  style={{ borderBottomWidth: 2 }}>
                        <Text>{"Book Id:" + item.bookId}</Text>
                        <Text>{"student Id:" + item.studentId}</Text>
                        <Text>{"Transaction Type:" + item.transactionType}</Text>
                        {/* <Text>{"date: " + item.date()}</Text> */}

                    </View>
                )}
                keyExtractor = {(item,index) => index.toString()}
                onEndReached = {this.fetchMoreTransaction}
                onEndReachedThreshold={0.7}
            />
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            marginTop : 20
        },
        searchBar : {
            flexDirection:'row',
            height:40,
            width : 'auto',
            borderWidth : 0.5,
            alignItems: 'center',
            backgroundColor : 'gray'
        },
        bar : {
            borderWidth:2,
            height: 30,
            width: 300,
            paddingLeft : 10
        },
        searchButton :{
            borderWidth : 1,
            height:30,
            width: 50,
            alignItems: "center",
            justifyContent:"center",
            backgroundColor: "green"
        }
    }
)