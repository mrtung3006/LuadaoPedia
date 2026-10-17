import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { SCAM_QUIZ_QUESTIONS } from '../data/scamDatabase';

interface QuizViewProps {
  isElderMode: boolean;
  onNavigateHome: () => void;
  onNavigateAi: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ isElderMode, onNavigateHome, onNavigateAi }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = SCAM_QUIZ_QUESTIONS[currentQuestionIndex];
  const userSelected = selectedAnswers[currentQuestionIndex];

  const handleSelectOption = (optIndex: number) => {
    if (showExplanation || quizFinished) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optIndex,
    });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < SCAM_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
  };

  // Calculate score
  const correctCount = SCAM_QUIZ_QUESTIONS.filter(
    (q, idx) => selectedAnswers[idx] === q.correctIndex
  ).length;

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Kiểm tra độ cảnh giác của bạn</span>
        </div>
        <h1
          className={`font-black text-slate-900 ${
            isElderMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          Trắc Nghiệm Cảnh Giác Số
        </h1>
        <p className="text-sm text-slate-600">
          3 câu hỏi tình huống thực tế giúp bạn và gia đình củng cố phản xạ phòng chống lừa đảo
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Câu hỏi {currentQuestionIndex + 1} / {SCAM_QUIZ_QUESTIONS.length}</span>
              <span>Đã hoàn thành {Math.round(((currentQuestionIndex + 1) / SCAM_QUIZ_QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / SCAM_QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h2
              className={`font-black text-slate-900 leading-snug ${
                isElderMode ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
              }`}
            >
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isChosen = userSelected === idx;
                const isCorrect = currentQ.correctIndex === idx;

                let optStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                if (showExplanation) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                  } else if (isChosen && !isCorrect) {
                    optStyle = 'bg-red-50 border-red-400 text-red-950';
                  } else {
                    optStyle = 'bg-slate-50 opacity-60 border-slate-200 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${optStyle} ${
                      isElderMode ? 'text-base font-semibold' : 'text-sm font-medium'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {showExplanation && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {showExplanation && isChosen && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl space-y-2 animate-fade-in">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                Giải thích từ chuyên gia an ninh mạng:
              </span>
              <p className={`text-slate-800 ${isElderMode ? 'text-base font-medium' : 'text-sm'}`}>
                {currentQ.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm flex items-center gap-1.5 transition-colors"
                >
                  <span>{currentQuestionIndex < SCAM_QUIZ_QUESTIONS.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Result */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/25">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Kết quả của bạn:
            </span>
            <div className="text-4xl font-black text-slate-900">
              {correctCount} / {SCAM_QUIZ_QUESTIONS.length} Câu đúng
            </div>
            <p className={`text-slate-700 font-medium ${isElderMode ? 'text-lg' : 'text-base'}`}>
              {correctCount === 3
                ? 'Xuất sắc! Bạn có kiến thức phòng vệ số rất vững vàng, khó có kẻ lừa đảo nào có thể qua mắt được bạn!'
                : correctCount === 2
                ? 'Khá tốt! Bạn đã nhận diện được hầu hết các bẫy, nhưng cần đặc biệt cẩn trọng với các chiêu trò SMS Brandname và mạo danh công an.'
                : 'Cảnh báo! Bạn cần dành thêm thời gian đọc kỹ các kịch bản trong LuadaoPedia để bảo vệ tài sản của bản thân và gia đình.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài trắc nghiệm</span>
            </button>
            <button
              onClick={onNavigateHome}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors"
            >
              Đọc thư viện kịch bản
            </button>
            <button
              onClick={onNavigateAi}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm transition-colors"
            >
              Thử Trợ lý AI kiểm chứng tin nhắn
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
