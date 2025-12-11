// app/index.tsx
import 'reflect-metadata';
import React, { useRef, useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SafeAreaView, FlatList, Pressable, Text, View, StyleSheet, Image } from 'react-native';

// container y types están en src/_core (subir un nivel y entrar en src)
import container from '../src/_core/container';
import { TYPES } from '../src/_core/types';

// PeopleListVM está en app/ui/viewmodels (misma rama app)
import PersonaListaVM from './ui/viewmodels/PersonaListaVM';

// Persona está en src/_domain/entities
import Persona from '../src/_domain/entities/Persona';

const PeopleList = observer(() => {
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const vmRef = useRef<PersonaListaVM | null>(null);

  useEffect(() => {
    try {
      if (vmRef.current === null) {
        // El token en TYPES debe coincidir con el que registraste en el contenedor
        vmRef.current = container.get<PersonaListaVM>(TYPES.PeopleListVM);
        setIsReady(true);
      }
    } catch (err: any) {
      console.error('Error resolviendo VM:', err);
      setError(String(err?.message ?? err));
    }
  }, []);

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Error inicializando la vista: {error}</Text>
      </SafeAreaView>
    );
  }

  if (!isReady || !vmRef.current) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  const vm = vmRef.current;

  const renderItem = ({ item }: { item: Persona }) => (
    <Pressable
      onPress={() => {
        vm.personaSeleccionada = item;
      }}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    >
      {item.foto && item.foto.trim() ? (
        <Image source={{ uri: item.foto }} style={styles.avatar} onError={() => console.warn('Foto no disponible')} />
      ) : (
        <View style={styles.placeholder} />
      )}
      <View style={styles.info}>
        <Text style={styles.itemText}>
          {item.nombre} {item.apellidos}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Listado de Personas</Text>

      <View style={styles.selectedContainer}>
        {vm.personaSeleccionada && (
          <>
            {vm.personaSeleccionada.foto && vm.personaSeleccionada.foto.trim() ? (
              <Image source={{ uri: vm.personaSeleccionada.foto }} style={styles.largeAvatar} onError={() => console.warn('Foto no disponible')} />
            ) : (
              <View style={styles.largePlaceholder} />
            )}
            <Text style={styles.selectedName}>
              {vm.personaSeleccionada.nombre} {vm.personaSeleccionada.apellidos}
            </Text>
            {vm.personaSeleccionada.telefono && (
              <Text style={styles.detail}>📱 {vm.personaSeleccionada.telefono}</Text>
            )}
            {vm.personaSeleccionada.direccion && (
              <Text style={styles.detail}>📍 {vm.personaSeleccionada.direccion}</Text>
            )}
            {vm.personaSeleccionada.nombreDepartamento && (
              <Text style={styles.detail}>🏢 {vm.personaSeleccionada.nombreDepartamento}</Text>
            )}
          </>
        )}
      </View>

      <FlatList
        data={vm.personasList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => <Text style={styles.empty}>No hay personas registradas</Text>}
        contentContainerStyle={vm.personasList.length === 0 ? styles.flatEmpty : undefined}
      />
    </SafeAreaView>
  );
});

const App = () => <PeopleList />;

AppRegistry.registerComponent('main', () => App);
export default App;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  selectedContainer: { backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8, marginBottom: 12, alignItems: 'center' },
  selectedName: { fontSize: 18, fontWeight: 'bold', marginTop: 8, textAlign: 'center' },
  detail: { fontSize: 14, color: '#555', marginTop: 4, textAlign: 'center' },
  largeAvatar: { width: 80, height: 80, borderRadius: 40 },
  largePlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ddd' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  itemPressed: { backgroundColor: '#e6f2ff' },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  placeholder: { width: 44, height: 44, borderRadius: 22, marginRight: 12, backgroundColor: '#ddd' },
  info: { flex: 1 },
  itemText: { fontSize: 16 },
  separator: { height: 10 },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' },
  flatEmpty: { flex: 1, justifyContent: 'center' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
