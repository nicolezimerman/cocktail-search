import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./AddDrink.module.css";
import { DrinkToAdd } from "../../types/cocktails";
import { Link } from "react-router-dom";

const AddDrink = () => {
  const [formData, setFormData] = useState<DrinkToAdd>({
    name: "",
    ingredients: "",
    instructions: "",
    image: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrorMessage("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (
        !formData.name.trim() ||
        !formData.ingredients.trim() ||
        !formData.instructions.trim()
      ) {
        setErrorMessage(
          "Name, ingredients and instructions are required fields"
        );
        return;
      }

      console.log(JSON.stringify(formData));
      setSuccessMessage("Drink saved successfully");
    } catch (error) {
      setErrorMessage("Error saving drink. Please try again.");
    }
  };

  return (
    <div className={styles.page}>
      <h1>Add drink</h1>
      <main>
        {!successMessage ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <span className={styles.field}>
              <label>Name:</label>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </span>
            <span className={styles.field}>
              <label>Ingredients:</label>
              <textarea
                className={styles.input}
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
              />
            </span>
            <span className={styles.field}>
              <label>Instructions:</label>
              <textarea
                className={styles.input}
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
              />
            </span>
            <span className={styles.field}>
              <label>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </span>
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <button type="submit" className={styles.button}>
              Add Drink
            </button>
          </form>
        ) : (
          <div>{successMessage}</div>
        )}
        <div>
          <Link to="/">
            <button type="submit">Go back to list</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AddDrink;
