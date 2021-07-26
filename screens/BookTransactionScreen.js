import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
import { constant } from 'async';

export default class BookTransactionScreen extends React.Component{
    constructor(){
    super()
    this.state = {
        hasCameraPermissions: null,
        scanned: false,
        ScannedBookId: '',
        ScannedStudentId: '',
        scanData: '',
        buttonState: 'normal'
    }
    }
    getCameraPermissions = async (id) => {
        const{status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState ({
            hasCameraPermissions: status === "granted",
            buttonState: id,
            //buttonState: 'clicked',
            scanned: false
        })
    }
    handleBarCodeScan = async ({type, data}) => {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scan;
        const buttonState = this.state.buttonState

        if (buttonState !== "normal" && hasCameraPermissions){
            return(
                <BarCodeScanner
                style = {StyleSheet.absoluteFillObject}
                onBarCodeScanned = {scanned? undefined: this.handleBarCodeScan}
                />
            )
        }
        else if(buttonState === "normal"){
        return(
            <View style = {styles.container}>
            <View>
            <Image
            source = {require("../assets/booklogo.jpg")}
            style = {{width: 200, height: 200}}
            />
            <Text style = {{textAlign: 'center', fontSize: 30}}>
            Willy
            </Text>
            </View>  
            <View style = {styles.inputView}>
            <TextInput style = {styles.inputBox}
            placeholder = "Book ID"
            value = {this.state.ScannedBookId} />
            <TouchableOpacity style = {styles.scanButton}
            onPress = {() => {
            this.getCameraPermissions("BookId")
            }}>
            <Text style = {styles.buttonText}>
            Scan 
            </Text>
            </TouchableOpacity>
            </View>
            <View style = {styles.inputView}>
            <TextInput style = {styles.inputBox}
            placeholder = "Student ID"
            value = {this.state.ScannedStudentId} />
            <TouchableOpacity style = {styles.scanButton}
            onPress = {() => {
            this.getCameraPermissions("StudentId")
            }}>
            <Text style = {styles.buttonText}>
            Scan 
            </Text>
            </TouchableOpacity>
            </View>
                </View>
            )
        }
       
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' }, 
        displayText:
        { fontSize: 15, 
            textDecorationLine: 'underline' },
             scanButton:
             { backgroundColor: '#2196F3',
              padding: 10, 
              margin: 10 },
               buttonText:{ fontSize: 15,
                 textAlign: 'center',
                  marginTop: 10 }, 
                  inputView:
                  { flexDirection: 'row',
                   margin: 20 }, 
                   inputBox:{ width: 200, 
                    height: 40,
                     borderWidth: 1.5,
                      borderRightWidth: 0,
                       fontSize: 20 },
                        scanButton:
                        { backgroundColor: '#66BB6A',
                         width: 50,
                          borderWidth: 1.5, 
                          borderLeftWidth: 0}
})