import { Card, Stack, SvgIcon } from "@mui/joy";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { CertificationSearchModal } from "./certification-search-modal";

async function fetchCertificationCategory() {
  const { data, error } = await supabase
    .from("certification")
    .select("obligfldcd, obligfldnm")
    .not("obligfldcd", "is", null);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  const formattedData = data.map((item) => ({
    code: item.obligfldcd,
    name: item.obligfldnm,
  }));

  const uniqueData = formattedData.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.code === value.code && t.name === value.name),
  );
  return uniqueData;
}

export default function CertificationCardTable() {
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await fetchCertificationCategory();
        setCategories(category);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategory();
  }, []);

  function handleCardClick(category) {
    setSelectedCategory(category);
    setOpen(true);
  }

  return (
    <>
      <Stack
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {categories.map((category) => (
          <Card
            key={category.name}
            size="sm"
            variant="soft"
            onClick={() => handleCardClick(category)}
          >
            {category.name}
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </SvgIcon>
          </Card>
        ))}
        {open && (
          <CertificationSearchModal
            open={open}
            setOpen={setOpen}
            category={selectedCategory}
          />
        )}
      </Stack>
    </>
  );
}
