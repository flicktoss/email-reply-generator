import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Paper,
  useMediaQuery,
  Fade,
  CssBaseline,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import axios from 'axios';

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1e3a8a 30%, #2563eb 90%)',
  color: 'white',
  fontWeight: 600,
  padding: '14px 0',
  fontSize: '1.1rem',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.5)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.7)',
  },
  '&:disabled': {
    background: theme.palette.action.disabledBackground,
    boxShadow: 'none',
    color: theme.palette.action.disabled,
  },
}));

const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  letterSpacing: 0.5,
  userSelect: 'none',
}));

export default function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCopied, setShowCopied] = useState(false);

  const handleSubmit = async () => {
    if (!emailContent.trim()) {
      setError('Please enter the email content.');
      return;
    }
    setLoading(true);
    setError('');
    setGeneratedReply('');

    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      });

      const reply = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
      setGeneratedReply(reply.trim());
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          bgcolor: 'linear-gradient(135deg, #e0e7ff 0%, #f9fafb 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 6,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant={isSmallScreen ? 'h4' : 'h3'}
            fontWeight="bold"
            align="center"
            gutterBottom
            sx={{ color: '#1e293b', mb: 6, letterSpacing: 1 }}
          >
            Email Reply Generator
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              gap: 6,
              alignItems: 'stretch',
            }}
          >
            {/* Left Panel - Input */}
            <Paper
              elevation={6}
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 3,
                bgcolor: 'white',
                boxShadow: '0 8px 24px rgb(59 130 246 / 0.15)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Label variant="subtitle1">Original Email Content</Label>
              <TextField
                multiline
                rows={8}
                placeholder="Paste the email here..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mb: 4, fontSize: '1rem' }}
                autoFocus
              />

              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="tone-label">Select Tone</InputLabel>
                <Select
                  labelId="tone-label"
                  value={tone}
                  label="Select Tone"
                  onChange={(e) => setTone(e.target.value)}
                  size="medium"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="friendly">Friendly</MenuItem>
                </Select>
              </FormControl>

              <GradientButton
                onClick={handleSubmit}
                disabled={loading || !emailContent.trim()}
                fullWidth
                aria-label="Generate Email Reply"
              >
                {loading ? <CircularProgress size={28} color="inherit" /> : 'Generate Reply'}
              </GradientButton>

              {error && (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{ mt: 2, fontWeight: 600, userSelect: 'none' }}
                  role="alert"
                >
                  {error}
                </Typography>
              )}
            </Paper>

            {/* Right Panel - Output */}
            <Paper
              elevation={6}
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 3,
                bgcolor: 'white',
                boxShadow: '0 8px 24px rgb(59 130 246 / 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 360,
              }}
            >
              <Label variant="subtitle1" sx={{ mb: 1 }}>
                Generated Reply
              </Label>

              <Fade in={!!generatedReply}>
                <TextField
                  multiline
                  rows={10}
                  variant="outlined"
                  value={generatedReply}
                  inputProps={{ readOnly: true, spellCheck: false }}
                  fullWidth
                  sx={{ flexGrow: 1, fontSize: '1rem', mb: 3 }}
                  placeholder="Your generated reply will appear here..."
                />
              </Fade>

              <Fade in={!!generatedReply}>
                <GradientButton
                  variant="outlined"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedReply);
                    setShowCopied(true);
                  }}
                  fullWidth
                  sx={{
                    mt: 'auto',
                    bgcolor: 'transparent',
                    color: '#2563eb',
                    borderColor: '#2563eb',
                    fontWeight: '600',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#e0e7ff',
                      borderColor: '#1e40af',
                      color: '#1e40af',
                      boxShadow: '0 0 8px rgba(30,64,175,0.3)',
                    },
                  }}
                >
                  Copy to Clipboard
                </GradientButton>
              </Fade>
            </Paper>
          </Box>
        </Container>

        {/* Snackbar for copy confirmation */}
        <Snackbar
          open={showCopied}
          autoHideDuration={2500}
          onClose={() => setShowCopied(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          TransitionComponent={Fade}
        >
          <Alert
            onClose={() => setShowCopied(false)}
            severity="success"
            sx={{ width: '100%', fontWeight: 600 }}
            variant="filled"
          >
            Copied to clipboard!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
