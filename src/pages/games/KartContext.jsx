// import { useState } from "react";
// import { Card, CardContent, CardHeader } from "@shadcn/ui";
// import { Button } from "@shadcn/ui";
// import { AlertCircle, Gift } from "lucide-react";
// import { motion } from "framer-motion";


const prizes = [
  "سکه طلا", "سکه برنز", "سکه الماس", "سکه نقره",
  "گوشی موبایل", "تلویزیون", "کنسول بازی", "لپ‌تاپ"
];

export default function RewardCard() {
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [alertAdmin, setAlertAdmin] = useState(false);

  const drawPrize = () => {
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    setSelectedPrize(randomPrize);
    setAlertAdmin(!["سکه طلا", "سکه برنز", "سکه الماس", "سکه نقره"].includes(randomPrize));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <Card className="w-80 text-center shadow-lg">
        <CardHeader className="text-xl font-bold">کارت جایزه</CardHeader>
        <CardContent>
          {selectedPrize ? (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold text-blue-600"
            >
              🎉 جایزه شما: {selectedPrize}
            </motion.div>
          ) : (
            <p className="text-gray-500">دکمه زیر را برای دریافت جایزه فشار دهید</p>
          )}
          <Button className="mt-4" onClick={drawPrize}>
            دریافت جایزه 🎁
          </Button>
          {alertAdmin && (
            <div className="mt-4 flex items-center gap-2 text-red-500">
              <AlertCircle /> <span>مدیر باید مطلع شود!</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
