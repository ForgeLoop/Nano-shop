import { useState, useEffect, useMemo } from "react";
import {
  Layout, 
} from "antd";
import { useIsMobile } from "@/hooks/useWindowSize";
import { adminStyles } from "@/pages/pages.styles";
import { DeleteModal } from "@/components/admin/shared/DeleteModal";
import { useCrud } from "@/hooks/useCrud";
import CategoryList from "@/components/admin/categories/components/CategoryList";
import { Category, categoryService } from "@/services/categoryService";
import CreateUpdateCategoryModal from "@/components/admin/categories/modals/CreateUpdateCategoryModal";

export default function Admin() {
  // Categories
  const { data: categories, loading: getCategoriesLoading, execute:fetchCategories} = useCrud<Category[]>(categoryService.getAllCategories);
  const { data: category, loading: getCategoryLoading, execute: fetchCategory } = useCrud<Category | null>(categoryService.getCategoryById);
  const { execute: updateCategory, loading: loadingUpdateCategory } = useCrud(categoryService.updateCategory)
  const { execute: deleteCategory, loading: loadingDeleteCategory } = useCrud(categoryService.deleteCategory)
  const { execute: createCategory, loading: loadingCreateCategory } = useCrud(categoryService.createCategory)
  const isLoadingCategories = useMemo(() => getCategoriesLoading || getCategoryLoading || loadingUpdateCategory || loadingDeleteCategory || loadingCreateCategory, [getCategoriesLoading, getCategoryLoading, loadingUpdateCategory, loadingDeleteCategory, loadingCreateCategory]);

  const isMobile = useIsMobile();
  // Categories Consts
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [deleteCategoryObject, setDeleteCategoryObject] = useState<Category | null>(null);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  useEffect(() => {
      fetchCategories();
  }, []);

  // Categories handlers
  const handleUpdateCategory = async (id: number) => {
    await fetchCategory(id);
    setUpdateCategoryModal(true);
  }
  const confirmUpdateCategory = async (id: number | string | undefined, body: Category) => {
    await updateCategory(id, body);
    setUpdateCategoryModal(false);
    fetchCategories();
  }
  const handleDeleteCategory = async (category: Category) => {
    setDeleteCategoryObject(category);
    setDeleteCategoryModal(true);
  }
  const confirmDeleteCategory = async (id: number | string) => {
    await deleteCategory(id);
    setDeleteCategoryModal(false);
    fetchCategories();
  }
  const handleCreateCategory = () => {
    setCreateCategoryModal(true);
  }
  const confirmCreateCategory = async (body: Category) => {
    await createCategory(body);
    setCreateCategoryModal(false);
    fetchCategories();
  }
  const handleCategorySubmit = (id: number | string | undefined, values: any) => {
    if (id) {
      confirmUpdateCategory(id, values);
    } else {
      confirmCreateCategory(values);
    }
  }

  return (
    <Layout>
        {isLoadingCategories || categories && (
            <CategoryList 
                categories={categories}
                onEdit={handleUpdateCategory}
                onDelete={handleDeleteCategory}
                adminStyles={adminStyles}
                onCreate={handleCreateCategory}
                isMobile={isMobile}
            />
        )}
        {updateCategoryModal && category && (
            <CreateUpdateCategoryModal 
                open={updateCategoryModal}
                onCancel={() => {
                setUpdateCategoryModal(false)
                }}
                onSubmit={handleCategorySubmit}
                isMobile={isMobile}
                adminStyles={adminStyles}
                category={category}
                loading={getCategoryLoading}
            />
        )}
        {createCategoryModal && (
            <CreateUpdateCategoryModal 
                open={createCategoryModal}
                onCancel={() => {
                setCreateCategoryModal(false)
                }}
                onSubmit={handleCategorySubmit}
                isMobile={isMobile}
                adminStyles={adminStyles}
            />
        )}
        {deleteCategoryModal && (
            <DeleteModal
                open={deleteCategoryModal}
                title="¿Eliminar categoría?"
                message={deleteCategoryObject ? `¿Seguro que quieres eliminar la categoría "${deleteCategoryObject.name}"?` : ""}
                onCancel={() => {
                    setDeleteCategoryModal(false);
                    setDeleteCategoryObject(null);
                }}
                onDelete={() => {
                if (deleteCategoryObject) confirmDeleteCategory(deleteCategoryObject.id);
                setDeleteCategoryObject(null);
                }}
            />
        )}
    </Layout>
  );
}