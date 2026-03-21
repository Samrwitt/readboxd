import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { useNavigation } from '@react-navigation/native';
import { useReadboxdStore } from '../store/useReadboxdStore';

export default function ImportScreen() {
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedCount, setParsedCount] = useState<number | null>(null);
  const navigation = useNavigation();

  // Pick CSV File
  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'text/comma-separated-values'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
        setParsedCount(null);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick the CSV file.');
    }
  };

  // Process the CSV 
  const handleProcessCsv = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);

    try {
      // Read the file as a string
      const csvString = await FileSystem.readAsStringAsync(selectedFile.uri);

      Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data;
          
          setIsProcessing(false);
          setParsedCount(data.length);

          // Simulated Success Message
          Alert.alert(
            'Import Successful', 
            `Successfully found ${data.length} books in your Goodreads export.\n\n(In a real app, this would now fetch covers and save to the database)`,
            [{ text: 'OK', onPress: () => setSelectedFile(null) }] // Reset after success
          );
        },
        error: (error: Error) => {
          setIsProcessing(false);
          console.error("Parse Error:", error);
          Alert.alert('Parsing Error', 'Could not parse the CSV file.');
        }
      });
      
    } catch (error) {
      setIsProcessing(false);
      console.error('Error reading file:', error);
      Alert.alert('Error', 'Failed to read the file contents.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 pt-6">
        
        {/* Header */}
        <View className="mb-8">
          <Text className="text-white text-3xl font-bold mb-2">Import Data</Text>
          <Text className="text-textLight text-base">Bring your library over from Goodreads so you don't lose your history.</Text>
        </View>

        {/* Step 1: Instructions */}
        <View className="bg-surface p-4 rounded-xl border border-secondary mb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
              <Text className="text-white font-bold">1</Text>
            </View>
            <Text className="text-white text-lg font-bold">Export from Goodreads</Text>
          </View>
          <View className="ml-11">
            <Text className="text-textLight text-sm mb-2">• Go to the Goodreads website</Text>
            <Text className="text-textLight text-sm mb-2">• Navigate to My Books {'>'} Tools {'>'} Import/Export</Text>
            <Text className="text-textLight text-sm mb-2">• Click "Export Library"</Text>
            <Text className="text-textLight text-sm mb-2">• Save the generated .csv file to your device</Text>
          </View>
        </View>

        {/* Step 2: Upload */}
        <View className="bg-surface p-4 rounded-xl border border-secondary mb-8">
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
              <Text className="text-white font-bold">2</Text>
            </View>
            <Text className="text-white text-lg font-bold">Upload CSV</Text>
          </View>
          
          <View className="ml-11">
            {!selectedFile ? (
              <TouchableOpacity 
                onPress={handlePickDocument}
                className="bg-secondary rounded-lg py-4 px-4 items-center flex-row justify-center border border-primary/30"
              >
                <Ionicons name="document-attach" size={20} color="#00e054" className="mr-2" />
                <Text className="text-primary font-bold ml-2">Select Goodreads CSV</Text>
              </TouchableOpacity>
            ) : (
              <View className="bg-background rounded-lg p-4 border border-primary/50">
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center flex-1">
                    <Ionicons name="document-text" size={24} color="#00e054" />
                    <Text className="text-white font-semibold ml-2 flex-1" numberOfLines={1}>
                      {selectedFile.name}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setSelectedFile(null)}>
                    <Ionicons name="close-circle" size={24} color="#99aabb" />
                  </TouchableOpacity>
                </View>

                <Text className="text-textLight text-xs mb-4">
                  File Size: {(selectedFile.size ?? 0) / 1000} KB
                </Text>

                <TouchableOpacity 
                  onPress={handleProcessCsv}
                  disabled={isProcessing}
                  className={`py-3 rounded-lg items-center ${isProcessing ? 'bg-primary/50' : 'bg-primary'}`}
                >
                  {isProcessing ? (
                    <ActivityIndicator color="#14181c" />
                  ) : (
                    <Text className="text-background font-bold uppercase tracking-wider">Start Import</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
