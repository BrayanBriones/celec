import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const initialCombos = [
  { id: 1, name: "Combo Bolón Power", price: 4.00, status: 'Activo', image: "https://i.postimg.cc/43NWM4VG/bolon-Con-Bistec.jpg", description: "Un delicioso bolón de verde con bistec de carne y café pasado." },
  { id: 2, name: "Combo Encebollado Resucitador", price: 3.50, status: 'Activo', image: "https://i.postimg.cc/G2Txw4pW/encebollado.jpg", description: "Nuestro famoso encebollado de pescado con chifles y arroz." },
  { id: 3, name: "Combo Cangrejo Criollo", price: 7.50, status: 'Agotado', image: "https://i.postimg.cc/YCJSD0JG/cangrejo.jpg", description: "2-3 cangrejos criollos en nuestra salsa especial." },
];

const ComboForm = ({ combo, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: combo?.name || '',
    description: combo?.description || '',
    price: combo?.price || '',
    image: combo?.image || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: combo?.id || Date.now(), status: combo?.status || 'Activo' });
  };
  
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">{combo ? 'Editar Combo' : 'Agregar Nuevo Combo'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Combo</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required step="0.01" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="https://example.com/image.jpg" />
        </div>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
          <Button type="submit" className="btn-gradient">Guardar Combo</Button>
        </div>
      </form>
    </motion.div>
  );
};

const ManageCombos = () => {
  const [combos, setCombos] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCombo, setEditingCombo] = useState(null);

  useEffect(() => {
    const storedCombos = JSON.parse(localStorage.getItem('local_combos'));
    setCombos(storedCombos || initialCombos);
  }, []);

  const updateLocalStorage = (updatedCombos) => {
    localStorage.setItem('local_combos', JSON.stringify(updatedCombos));
  };
  
  const handleSave = (comboData) => {
    let updatedCombos;
    if (editingCombo) {
      updatedCombos = combos.map(c => c.id === comboData.id ? comboData : c);
      toast({ title: "¡Combo actualizado!", description: "El combo ha sido modificado exitosamente." });
    } else {
      updatedCombos = [...combos, comboData];
      toast({ title: "¡Combo agregado!", description: "El nuevo combo ya está disponible." });
    }
    setCombos(updatedCombos);
    updateLocalStorage(updatedCombos);
    setIsFormVisible(false);
    setEditingCombo(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este combo?")) {
      const updatedCombos = combos.filter(c => c.id !== id);
      setCombos(updatedCombos);
      updateLocalStorage(updatedCombos);
      toast({ title: "¡Combo eliminado!", variant: "destructive" });
    }
  };

  const handleEdit = (combo) => {
    setEditingCombo(combo);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    setEditingCombo(null);
    setIsFormVisible(true);
  };

  return (
    <>
      <Helmet><title>Gestionar Combos - KIOSKU BITES</title></Helmet>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestionar Combos</h1>
          {!isFormVisible && (
            <Button onClick={handleAddNew} className="btn-gradient">
              <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo
            </Button>
          )}
        </div>

        {isFormVisible && <ComboForm combo={editingCombo} onSave={handleSave} onCancel={() => { setIsFormVisible(false); setEditingCombo(null); }} />}
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Mis Combos Publicados</h2>
          <div className="space-y-4">
            {combos.map(combo => (
              <motion.div key={combo.id} layout className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                {combo.image ? (
                    <img src={combo.image} alt={combo.name} className="w-20 h-20 rounded-md object-cover" />
                ) : (
                    <div className="w-20 h-20 rounded-md bg-gray-100 flex items-center justify-center text-gray-400">
                        <ImageIcon />
                    </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{combo.name}</h3>
                  <p className="text-sm text-gray-500">{combo.description}</p>
                  <p className="font-semibold text-primary">${Number(combo.price).toFixed(2)}</p>
                </div>
                <div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${combo.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {combo.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(combo)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(combo.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCombos;
