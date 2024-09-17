import React from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddBook = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("category", values.category);
    formData.append("author", values.author);
    formData.append("title", values.title);
    formData.append("sharedBy", values.sharedBy);

    try {
      const response = await axios.post(
        `http://localhost:3001/book/createBook`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      resetForm(); // Reset form fields after successful submission
    } catch (error) {
      console.error("Error uploading file:", error.response);
      console.error("Error message:", error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    author: yup.string().required("required"),
    sharedBy: yup.string(),
    category: yup.string().required("required"),
    file: yup
      .mixed()
      .required("required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 1024 * 1024 * 10 // 10MB
      ),
  });

  const initialValues = {
    title: "",
    author: "",
    sharedBy: "",
    category: "",
    file: null,
  };

  return (
    <Box m="20px">
      <Header
        title="Add a Book"
        subtitle="Upload a Book with necessary information"
      />
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Author"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.author}
                name="author"
                error={!!touched.author && !!errors.author}
                helperText={touched.author && errors.author}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="SharedBy"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sharedBy}
                name="sharedBy"
                error={!!touched.sharedBy && !!errors.sharedBy}
                helperText={touched.sharedBy && errors.sharedBy}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="file"
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("file", e.target.files[0])}
                name="file"
                error={!!touched.file && !!errors.file}
                helperText={touched.file && errors.file}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload a Book"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddBook;
