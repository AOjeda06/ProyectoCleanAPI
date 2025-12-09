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
  const vmRef = useRef<PersonaListaVM | null>(null);

  useEffect(() => {
    try {
      if (vmRef.current === null) {
        // El token en TYPES debe coincidir con el que registraste en el contenedor
        vmRef.current = container.get<PersonaListaVM>(TYPES.PeopleListVM);
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

  if (!vmRef.current) {
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
      {item.foto ? (
        <Image source={{ uri: item.foto }} style={styles.avatar} />
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

      <Text style={styles.selected}>
        Persona seleccionada: {vm.personaSeleccionada?.nombre ?? '-'} {vm.personaSeleccionada?.apellidos ?? ''}
      </Text>

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
  selected: { fontSize: 16, marginBottom: 12, textAlign: 'center' },
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
