import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import {
    Button,
    Center,
    HStack,
    Input,
    Text,
    VStack,
  } from '@chakra-ui/react';
import useStore from '../../store';
import { useContract } from '../../hooks/contractHooks';

export default function Home (props) {
    const greeterContract = useContract("Greeter");
    const [greeting, setGreetingValue] = useState();

    useEffect(() => {
        console.log('greeting changed: ' + greeting);
    }, [greeting])

    async function fetchGreeting() {
        try {
            if(greeterContract != null) {
                const data = await greeterContract.greet();                
                console.log('data: ', data);
                setGreetingValue(data);
            }
        } catch (err) {
            console.log("Error: ", err);
        }   
    }

    async function setGreeting() {
        try {
            if(greeterContract != null) {
                const transaction = await greeterContract.setGreeting(greeting);
                await transaction.wait();
                fetchGreeting();
            }
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    return(
        <Center mt="10rem">
            <VStack spacing={10}>
                <Text
                    bgGradient="linear(to-l, #7928CA,#FF0080)"
                    bgClip="text"
                    fontSize="6xl"
                    fontWeight="extrabold">
                    Welcome to Moriarty
                </Text>

                <Button w="200px" onClick={fetchGreeting}>Fetch Greeting</Button>

                <HStack>
                    <Input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
                    <Button w={300} onClick={setGreeting}>Set Greeting</Button>
                </HStack>
                
            </VStack>
        </Center>
    );

} 